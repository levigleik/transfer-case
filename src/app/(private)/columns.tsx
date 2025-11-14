"use client";

import type { ColumnDef } from "@tanstack/react-table";

import {
	ArrowUpDown,
	ChevronsUpDown,
	MoreHorizontal,
	Pencil,
	Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
};

export const columns: ColumnDef<Payment>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="dark:bg-background size-4.5 [&_svg]:size-3"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="dark:bg-background size-4.5 [&_svg]:size-3"
			/>
		),
		enableSorting: false,
		enableHiding: false,
		size: 40,
	},

	{
		accessorKey: "id",
		header: ({ column }) => {
			return (
				<div className="flex items-center h-full">
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="text-secondary-foreground/80 rounded-sm -ms-3 px-2 h-8 hover:text-foreground"
					>
						ID
						<ChevronsUpDown className="size-3" />
					</Button>
				</div>
			);
		},
		size: 65,
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<div className="flex items-center h-full">
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="text-secondary-foreground/80 rounded-sm -ms-3 px-2 h-8 hover:text-foreground"
					>
						Status
						<ChevronsUpDown className="size-3" />
					</Button>
				</div>
			);
		},
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<div className="flex items-center h-full">
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="text-secondary-foreground/80 rounded-sm -ms-3 px-2 h-8 hover:text-foreground"
					>
						Email
						<ChevronsUpDown className="size-3" />
					</Button>
				</div>
			);
		},
	},
	{
		accessorKey: "amount",
		header: ({ column }) => {
			return (
				<div className="flex items-center h-full">
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="text-secondary-foreground/80 rounded-sm -ms-3 px-2 h-8 hover:text-foreground"
					>
						Amount
						<ChevronsUpDown className="size-3" />
					</Button>
				</div>
			);
		},
		// cell: ({ row }) => {
		// 	const amount = parseFloat(row.getValue("amount"));
		// 	const formatted = new Intl.NumberFormat("en-US", {
		// 		style: "currency",
		// 		currency: "USD",
		// 	}).format(amount);
		//
		// 	return <div className="text-right font-medium">{formatted}</div>;
		// },
	},
	{
		id: "actions",
		size: 96,
		enablePinning: true,
		cell: ({ row }) => {
			return (
				<div className="opacity-0 group-hover/table:opacity-100 transition-opacity backdrop-blur-xs p-0">
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon">
							<Pencil />
						</Button>
						<Button variant="ghost" size="icon">
							<Trash className="text-destructive" />
						</Button>
					</div>
				</div>
			);
		},
	},
];
