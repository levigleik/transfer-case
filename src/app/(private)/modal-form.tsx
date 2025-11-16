import { BusFront, Info, LucidePlus } from "lucide-react";
import { Form } from "@/app/(private)/form";
import type { VehicleData } from "@/app/(private)/types";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";

type ModalFormProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	vehicle?: VehicleData;
};

export function ModalForm({ open, setOpen, vehicle }: ModalFormProps) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<LucidePlus />
					Adicionar
				</Button>
			</DialogTrigger>
			<DialogContent className="p-0 rounded-xl overflow-hidden gap-0 focus-visible:outline-none sm:max-w-2xl">
				<div className="flex items-center gap-3 p-6">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-full border">
						<BusFront />
					</div>
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>
							Preencha os campos abaixo para cadastrar um novo transfer.
						</DialogDescription>
					</DialogHeader>
				</div>
				<Tabs defaultValue="account">
					<TabsList className="inline-flex w-fit items-center justify-center p-[3px] text-foreground h-auto gap-2 rounded-none bg-transparent px-6 py-1">
						<TabsTrigger
							value="account"
							className="data-[state=active]:after:bg-primary after:absolute after:inset-x-0 after:bottom-0 after:-mb-1.5 after:h-[3px] after:rounded-t"
						>
							<Info />
							Informações
						</TabsTrigger>
						<TabsTrigger
							value="password"
							className="data-[state=active]:after:bg-primary after:absolute after:inset-x-0 after:bottom-0 after:-mb-1.5 after:h-[3px] after:rounded-t"
						>
							Password
						</TabsTrigger>
					</TabsList>
					<TabsContents className="mx-1 mb-1 -mt-2 rounded-sm h-full bg-background">
						<TabsContent value="account" className="space-y-5 p-6">
							<Form vehicle={vehicle} />
						</TabsContent>
						<TabsContent value="password" className="space-y-6 p-6">
							<p className="text-sm text-muted-foreground">
								Change your password here. After saving, you&apos;ll be logged
								out.
							</p>
							<div className="space-y-3">
								<div className="space-y-1">
									<Label htmlFor="current">Current password</Label>
									<Input id="current" type="password" />
								</div>
								<div className="space-y-1">
									<Label htmlFor="new">New password</Label>
									<Input id="new" type="password" />
								</div>
								<div className="space-y-1">
									<Label htmlFor="confirm">Confirm password</Label>
									<Input id="confirm" type="password" />
								</div>
							</div>
							<Button>Save password</Button>
						</TabsContent>
					</TabsContents>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
