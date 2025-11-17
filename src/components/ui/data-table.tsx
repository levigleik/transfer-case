"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	type ColumnPinningState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import {
	Bot,
	ChevronDown,
	ChevronFirstIcon,
	ChevronLastIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	CloudDownload,
	Filter,
	LucidePlus,
	RotateCw,
	Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { RiOpenaiFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	paginationProps?: {
		initialRowsPerPage?: number;
		rowsPerPage?: number[];
	};
	loading?: boolean;
	topRightActions?: React.ReactNode;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	paginationProps,
	topRightActions,
	loading = false,
}: DataTableProps<TData, TValue>) {
	const initialRowsPerPage = paginationProps?.initialRowsPerPage ?? 10;
	const rowsPerPage = paginationProps?.rowsPerPage ?? [5, 10, 15, 20];

	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: initialRowsPerPage,
	});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
		right: ["actions"],
	});

	// const placeholderText = useMemo(() => {
	// 	const headerTexts = columns
	// 		.filter(
	// 			(col) =>
	// 				col.enableColumnFilter === true && (col.meta as any)?.headerText,
	// 		)
	// 		.map((col) => (col.meta as any).headerText); // Usamos 'as any' para funcionar mesmo sem a etapa de tipagem
	//
	// 	if (headerTexts.length === 0) {
	// 		return "Filtrar tudo...";
	// 	}
	//
	// 	return `Buscar por ${headerTexts.join(", ")}...`;
	// }, [columns]);

	const tableData = useMemo(
		() => (loading ? Array(30).fill({}) : data),
		[loading, data],
	);
	const tableColumns = useMemo(
		() =>
			loading
				? columns.map((column) => ({
						...column,
						cell: () => <Skeleton className="h-8 w-full rounded-lg" />,
					}))
				: columns,
		[loading, columns],
	);

	const table = useReactTable({
		data: tableData,
		columns: tableColumns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		onColumnPinningChange: setColumnPinning,
		onGlobalFilterChange: setGlobalFilter,
		state: {
			sorting,
			columnFilters,
			pagination,
			columnPinning,
			globalFilter,
		},
	});

	const facetedFilters = useMemo(
		() =>
			table
				.getAllColumns()
				.filter((column) => column.columnDef?.meta?.filterable),
		[table],
	);

	return (
		<>
			<div className="flex h-full border-b items-center py-4 justify-between gap-4 px-5">
				<div className="flex items-center gap-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size="icon"
								className={cn(
									"cursor-pointer w-10 h-9 relative overflow-hidden",
									"before:absolute before:inset-0 before:rounded-[inherit] before:bg-[length:250%_250%,100%_100%]",
									"before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)]",
									"before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease]",
									"before:duration-1000 hover:before:bg-[position:-100%_0,0_0]",
									"dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]",
								)}
							>
								<Bot />
							</Button>
						</TooltipTrigger>
						<TooltipContent
							sideOffset={12}
							side="bottom"
							align="start"
							className={cn(
								"bg-primary text-primary-foreground w-[310px] text-wrap",
								"dark:bg-primary dark:text-primary-foreground",
								"rounded-md border p-4 shadow-md outline-hidden",
							)}
						>
							<div className="flex items-start gap-4">
								<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white">
									<RiOpenaiFill size={24} />
								</div>
								<div className="space-y-1 font-normal">
									<p className="font-medium text-sm">@passAI</p>
									<p className="text-sm">
										Use the AI assistant to generate reports directly from your
										dashboard.
									</p>
									<p className="text-xs">Powered by PASS — © 2025</p>
								</div>
							</div>
						</TooltipContent>
					</Tooltip>
					<Separator
						orientation="vertical"
						className="data-[orientation=vertical]:w-px data-[orientation=vertical]:h-4 mx-0.5"
					/>
					<InputGroup className="w-52">
						<InputGroupInput
							// placeholder={placeholderText}
							placeholder="Buscar..."
							value={globalFilter ?? ""}
							onChange={(event) => setGlobalFilter(event.target.value)}
							className="max-w-sm"
						/>
						<InputGroupAddon>
							<Search />
						</InputGroupAddon>
					</InputGroup>
					{facetedFilters.map((column) => {
						const meta = column.columnDef.meta;
						return (
							<DataTableFacetedFilter
								key={column.id}
								column={column}
								title={meta?.filterTitle || column.id}
							/>
						);
					})}
				</div>
				{topRightActions}
			</div>
			<Table
				className={cn(
					"w-full caption-bottom text-sm relative grid border-separate",
					"border-spacing-0 [&_td]:border-border [&_th]:border-border [&_th]:border-b",
					"[&_tr:not(:last-child)_td]:border-b [&_tr]:border-none",
				)}
			>
				<TableHeader className="sticky top-0 z-10 rounded-t-xl">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							key={headerGroup.id}
							className="hover:bg-transparent flex w-full"
						>
							{headerGroup.headers.map((header) => {
								const pinSide = header.column.getIsPinned(); // "left" | "right" | false
								const isPinned = pinSide !== false;
								const pinnedIds = isPinned
									? (table.getState().columnPinning[pinSide] ?? [])
									: [];
								const isLastPinned =
									isPinned &&
									pinnedIds[pinnedIds.length - 1] === header.column.id;

								return (
									<TableHead
										key={header.id}
										data-pinned={isPinned ? pinSide : undefined}
										data-last-col={isLastPinned ? pinSide : undefined}
										style={{ width: `${header.getSize()}px` }}
										className={cn(
											"text-foreground text-left align-middle font-medium whitespace-nowrap",
											"[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] relative flex",
											"items-center h-10 truncate px-3",
											"[&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0",
											"[&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0",
											"[&[data-pinned=left][data-last-col=left]]:border-r",
											"[&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0",
											"[&[data-pinned][data-last-col]]:border-border",
											// "data-pinned:backdrop-blur-xs",
											pinSide === "right" && "sticky right-0 z-10",
											header.column.id !== "id" &&
												header.column.id !== "select" &&
												pinSide !== "right" &&
												"grow",
											!isPinned && "relative",
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
								{row.getVisibleCells().map((cell) => {
									const pinSide = cell.column.getIsPinned(); // "left" | "right" | false
									const isPinned = pinSide !== false;
									const pinnedIds = isPinned
										? (table.getState().columnPinning[pinSide] ?? [])
										: [];
									const isLastPinned =
										isPinned &&
										pinnedIds[pinnedIds.length - 1] === cell.column.id;
									return (
										<TableCell
											key={cell.id}
											data-pinned={isPinned ? pinSide : undefined}
											data-last-col={isLastPinned ? pinSide : undefined}
											className={cn(
												"px-3",
												"flex items-center [&[data-pinned=left][data-last-col=left]]:border-r",
												"[&[data-pinned][data-last-col]]:border-border",
												// "data-pinned:backdrop-blur-xs",
												pinSide === "right" && "sticky right-0 z-10",
												cell.column.id !== "id" &&
													cell.column.id !== "select" &&
													pinSide !== "right" &&
													"grow",
												!pinSide && "relative",
												isLastPinned && "group/table:hover:bg-foreground",
											)}
											style={{
												width: `${cell.column.getSize()}px`,
											}}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									);
								})}
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
			<div className="flex flex-col md:flex-row items-center justify-between flex-1 gap-2.5 border-t px-5 py-4">
				<div className="text-muted-foreground text-sm">
					{table.getSelectedRowModel().rows.length} de{" "}
					{table.getRowCount().toString()} linha(s) selecionadas.
				</div>
				<Select
					value={table.getState().pagination.pageSize.toString()}
					onValueChange={(value) => {
						table.setPageSize(Number(value));
					}}
				>
					<SelectTrigger size="sm">
						<SelectValue placeholder="Select number of results" />
					</SelectTrigger>
					<SelectContent className="[&_*[role=option]]:pr-8 [&_*[role=option]]:pl-2 [&_*[role=option]>span]:right-2 [&_*[role=option]>span]:left-auto">
						{rowsPerPage.map((pageSize) => (
							<SelectItem key={pageSize} value={pageSize.toString()}>
								{pageSize} / página
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<div className="flex items-center gap-4">
					<div className="flex grow justify-end text-sm whitespace-nowrap">
						<p className="font-medium">
							Página {table.getState().pagination.pageIndex + 1} de{" "}
							{Math.floor(
								table.getRowCount() / table.getState().pagination.pageSize,
							) + 1}
						</p>
					</div>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<Button
									size="icon"
									variant="outline"
									className="disabled:pointer-events-none disabled:opacity-50"
									onClick={() => table.firstPage()}
									disabled={!table.getCanPreviousPage()}
									aria-label="Ir para a primeira página"
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
		</>
	);
}
