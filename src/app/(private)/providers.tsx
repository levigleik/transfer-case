import { DocumentationFormProvider } from "@/app/(private)/context/documentation-context";
import { GasSupplyFormProvider } from "@/app/(private)/context/gas-supply-context";
import { ModalProvider } from "@/app/(private)/context/modal-context";
import { OccurrenceFormProvider } from "@/app/(private)/context/occurrence-context";
import { VehicleFormProvider } from "@/app/(private)/context/vehicle-context";

export default async function Providers({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<VehicleFormProvider>
			<DocumentationFormProvider>
				<OccurrenceFormProvider>
					<GasSupplyFormProvider>
						<ModalProvider>{children}</ModalProvider>
					</GasSupplyFormProvider>
				</OccurrenceFormProvider>
			</DocumentationFormProvider>
		</VehicleFormProvider>
	);
}
