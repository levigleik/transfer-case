import { DocumentationFormProvider } from "@/app/(private)/context/documentation-context";
import { ModalProvider } from "@/app/(private)/context/modal-context";
import { VehicleFormProvider } from "@/app/(private)/context/vehicle-context";

export default async function Providers({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<VehicleFormProvider>
			<DocumentationFormProvider>
				<ModalProvider>{children}</ModalProvider>
			</DocumentationFormProvider>
		</VehicleFormProvider>
	);
}
