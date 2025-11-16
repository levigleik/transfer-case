import type { VehicleData } from "@/app/(private)/types";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormProps {
	vehicle?: VehicleData;
}

export function Form({ vehicle }: FormProps) {
	return (
		<form>
			<div className="grid gap-4">
				<div className="grid gap-3">
					<Label htmlFor="name-1">Nome</Label>
					<Input id="name-1" name="name" />
				</div>
				<div className="grid gap-3">
					<Label htmlFor="username-1">Username</Label>
					<Input id="username-1" name="username" />
				</div>
			</div>
			<DialogFooter>
				<DialogClose asChild>
					<Button variant="outline">Cancel</Button>
				</DialogClose>
				<Button type="submit">Save changes</Button>
			</DialogFooter>
		</form>
	);
}
