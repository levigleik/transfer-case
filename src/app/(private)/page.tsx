import { columns, type Payment } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
	// Fetch data from your API here.
	return [
		{
			id: "728ed52f",
			amount: 100,
			status: "pending",
			email: "m@example.com",
		},
		{
			id: "0508ed13d",
			amount: 100,
			status: "pending",
			email: "mao@example.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "489e1d42",
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
