import { columns, type Payment } from "./columns";
import { DataTable } from "./data-table";

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
			<DataTable columns={columns} data={data} />
			{/*</div>*/}
		</div>
	);
}
