"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	type ColumnPinningState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { id } from "ci-info";
import {
	ChevronFirstIcon,
	ChevronLastIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	Filter,
	Search,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 5,
	});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
		right: ["actions"],
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		onColumnPinningChange: setColumnPinning,
		state: {
			sorting,
			columnFilters,
			pagination,
			columnPinning,
		},
	});

	return (
		<Card
			className={cn(
				"rounded-[14px] border-0 p-0 gap-0 overflow-hidden shadow-custom!",
				"dark:bg-background dark:shadow-none! dark:border dark:border-[#262626]",
				"max-h-[calc(100dvh-var(--header-height))] md:max-h-[calc(100dvh-var(--header-height)-3rem)]",
				"min-[56rem]:max-h-[calc(100dvh-var(--header-height)-4rem)]",
			)}
		>
			<div className="flex h-full border-b items-center py-4 justify-between gap-4 px-5">
				<div className="flex items-center gap-2">
					<InputGroup>
						<InputGroupInput placeholder="Search..." />
						<InputGroupAddon>
							<Search />
						</InputGroupAddon>
						<InputGroupAddon align="inline-end">12 results</InputGroupAddon>
					</InputGroup>
					<Button variant="outline" className="ml-auto">
						<Filter />
						Modo
					</Button>
				</div>
			</div>

			<Table
				className={cn(
					"w-full caption-bottom text-sm relative grid border-separate",
					"border-spacing-0 [&_td]:border-border [&_th]:border-border [&_th]:border-b",
					"[&_tr:not(:last-child)_td]:border-b [&_tr]:border-none",
				)}
			>
				<TableHeader className="bg-background/90 dark:bg-background/90 sticky top-0 z-10 rounded-t-xl backdrop-blur-xs">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							key={headerGroup.id}
							className="hover:bg-transparent flex w-full"
						>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										data-pinned={header.column.getIsPinned() || undefined}
										data-last-col={
											header.column.getIsPinned()
												? table
														.getState()
														// biome-ignore lint/style/noNonNullAssertion: <explanation>
														.columnPinning[header.column.getIsPinned()!]?.at(
															-1,
														) === header.column.id
													? header.column.getIsPinned()
													: undefined
												: undefined
										}
										style={{ width: `${header.getSize()}px` }}
										className={cn(
											"text-foreground text-left align-middle font-medium whitespace-nowrap",
											"[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] relative flex",
											"items-center h-10 truncate px-3",
											"[&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0",
											"[&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0",
											"[&[data-pinned=left][data-last-col=left]]:border-r",
											"[&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0",
											"[&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90",
											"data-pinned:backdrop-blur-xs dark:data-pinned:bg-background/90",
											header.column.getIsPinned() === "right" &&
												"sticky right-0 z-10",
											header.column.id !== "id" &&
												header.column.id !== "select" &&
												header.column.getIsPinned() !== "right" &&
												"grow",
											!header.column.getIsPinned() && "relative",
										)}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody className="grid">
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
								className={cn(
									"hover:bg-muted/40 data-[state=selected]:bg-muted",
									"border-b transition-colors flex w-full group/table",
								)}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										data-pinned={cell.column.getIsPinned() || undefined}
										data-last-col={
											cell.column.getIsPinned()
												? table
														.getState()
														.columnPinning[cell.column.getIsPinned()!]?.at(
															-1,
														) === cell.column.id
													? cell.column.getIsPinned()
													: undefined
												: undefined
										}
										className={cn(
											"px-3",
											"flex items-center [&[data-pinned=left][data-last-col=left]]:border-r",
											"[&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90",
											"data-pinned:backdrop-blur-xs dark:data-pinned:bg-background/90",
											cell.column.getIsPinned() === "right" &&
												"sticky right-0 z-10",
											cell.column.id !== "id" &&
												cell.column.id !== "select" &&
												cell.column.getIsPinned() !== "right" &&
												"grow",
											!cell.column.getIsPinned() && "relative",
										)}
										style={{
											width: `${cell.column.getSize()}px`,
										}}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className="flex items-center justify-between gap-8 px-5 py-4 border-t">
				<div className="flex items-center gap-3">
					<Label htmlFor={"id"} className="max-sm:sr-only">
						Rows per page
					</Label>
					<Select
						value={table.getState().pagination.pageSize.toString()}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger id={"id"} className="w-fit whitespace-nowrap">
							<SelectValue placeholder="Select number of results" />
						</SelectTrigger>
						<SelectContent className="[&_*[role=option]]:pr-8 [&_*[role=option]]:pl-2 [&_*[role=option]>span]:right-2 [&_*[role=option]>span]:left-auto">
							{[5, 10, 25, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={pageSize.toString()}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
					<p
						className="text-muted-foreground text-sm whitespace-nowrap"
						aria-live="polite"
					>
						<span className="text-foreground">
							{table.getState().pagination.pageIndex *
								table.getState().pagination.pageSize +
								1}
							-
							{Math.min(
								Math.max(
									table.getState().pagination.pageIndex *
										table.getState().pagination.pageSize +
										table.getState().pagination.pageSize,
									0,
								),
								table.getRowCount(),
							)}
						</span>{" "}
						of{" "}
						<span className="text-foreground">
							{table.getRowCount().toString()}
						</span>
					</p>
				</div>

				<div>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<Button
									size="icon"
									variant="outline"
									className="disabled:pointer-events-none disabled:opacity-50"
									onClick={() => table.firstPage()}
									disabled={!table.getCanPreviousPage()}
									aria-label="Go to first page"
								>
									<ChevronFirstIcon size={16} aria-hidden="true" />
								</Button>
							</PaginationItem>

							<PaginationItem>
								<Button
									size="icon"
									variant="outline"
									className="disabled:pointer-events-none disabled:opacity-50"
									onClick={() => table.previousPage()}
									disabled={!table.getCanPreviousPage()}
									aria-label="Go to previous page"
								>
									<ChevronLeftIcon size={16} aria-hidden="true" />
								</Button>
							</PaginationItem>

							<PaginationItem>
								<Button
									size="icon"
									variant="outline"
									className="disabled:pointer-events-none disabled:opacity-50"
									onClick={() => table.nextPage()}
									disabled={!table.getCanNextPage()}
									aria-label="Go to next page"
								>
									<ChevronRightIcon size={16} aria-hidden="true" />
								</Button>
							</PaginationItem>

							<PaginationItem>
								<Button
									size="icon"
									variant="outline"
									className="disabled:pointer-events-none disabled:opacity-50"
									onClick={() => table.lastPage()}
									disabled={!table.getCanNextPage()}
									aria-label="Go to last page"
								>
									<ChevronLastIcon size={16} aria-hidden="true" />
								</Button>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</Card>
	);
}
