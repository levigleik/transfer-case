import TableVehicle from "@/app/(private)/table-vehicle";

export default async function DemoPage() {
	return (
		<div className="flex flex-1 flex-col gap-6">
			<TableVehicle />
		</div>
	);
}
