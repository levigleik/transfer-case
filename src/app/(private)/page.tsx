import {
	Bot,
	ChevronDown,
	CloudDownload,
	Filter,
	LucidePlus,
	RotateCw,
	Search,
} from "lucide-react";
import { RiOpenaiFill } from "react-icons/ri";
import { DialogDemo } from "@/app/(private)/modal-form";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card } from "@/components/ui/card";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DataTable } from "../../components/ui/data-table";
import { columns, type Payment } from "./columns";

async function getData(): Promise<Payment[]> {
	// Fetch data from your API here.
	return [
		{
			id: "1",
			amount: 100,
			status: "pending",
			email: "m@example.com",
		},
		{
			id: "2",
			amount: 100,
			status: "pending",
			email: "mao@example.com",
		},
		{
			id: "3",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "4",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "21",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "32",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "14",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "22",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "23",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "40",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "66",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "69",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "6",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "9",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "8",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "7",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "52",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "58",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		// ...
	];
}

export default async function DemoPage() {
	const data = await getData();

	return (
		<div className="flex flex-1 flex-col gap-6">
			{/*<div className="relative w-full overflow-auto">*/}
			<Card
				className={cn(
					"rounded-[14px] p-0 gap-0 overflow-hidden shadow-custom! border dark:border-[#262626]",
					"max-h-[calc(100dvh-var(--header-height))] md:max-h-[calc(100dvh-var(--header-height)-3rem)]",
					"min-[56rem]:max-h-[calc(100dvh-var(--header-height)-4rem)] dark:shadow-none",
				)}
			>
				<DataTable columns={columns} data={data} />
			</Card>
			{/*</div>*/}
			<DialogDemo />
		</div>
	);
}
