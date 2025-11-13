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
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
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
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					ID
					<ChevronsUpDown className="size-3" />
				</Button>
			);
		},
		size: 65,
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Email
					<ChevronsUpDown className="size-3" />
				</Button>
			);
		},
	},
	{
		accessorKey: "amount",
		header: "Amount",
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
		cell: ({ row }) => {
			return (
				<div className="opacity-0 group-hover/table:opacity-100 transition-opacity duration-300 backdrop-blur-xs">
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon">
							<Pencil />
						</Button>
						<Button variant="destructive" size="icon">
							<Trash />
						</Button>
					</div>
				</div>
			);
		},
	},
];
