import { ChevronDown, CloudDownload, RotateCw } from "lucide-react";
import { ModalForm } from "@/app/(private)/modal-form";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
			<Card
				className={cn(
					"rounded-[14px] p-0 gap-0 overflow-hidden shadow-custom! border dark:border-[#262626]",
					"max-h-[calc(100dvh-var(--header-height))] md:max-h-[calc(100dvh-var(--header-height)-3rem)]",
					"min-[56rem]:max-h-[calc(100dvh-var(--header-height)-4rem)] dark:shadow-none",
				)}
			>
				<DataTable
					columns={columns}
					data={data}
					topRightActions={
						<div className="flex items-center gap-2">
							<Button variant="outline">
								<RotateCw />
								Atualizar
							</Button>
							<ButtonGroup>
								<Button variant="outline">
									<CloudDownload />
									Export
								</Button>
								<Button variant="outline" size="icon">
									<ChevronDown />
								</Button>
							</ButtonGroup>
							<Separator
								orientation="vertical"
								className="data-[orientation=vertical]:w-px data-[orientation=vertical]:h-4 mx-0.5"
							/>
							<ModalForm />
						</div>
					}
				/>
			</Card>
		</div>
	);
}
