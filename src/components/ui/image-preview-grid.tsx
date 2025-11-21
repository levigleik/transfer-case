"use client";

import { X } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import type { ImageValue } from "@/app/(private)/types/types-vehicle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ImagePreviewGridProps {
	images: ImageValue[];
	onRemove?: (id: string) => void;
	className?: string;
}

export function ImagePreviewGrid({
	images,
	onRemove,
	className,
}: ImagePreviewGridProps) {
	if (!images || images.length === 0) {
		return null;
	}

	return (
		<div className={cn("grid grid-cols-3 gap-2 md:grid-cols-4", className)}>
			{images.map((image) => (
				<ImagePreviewItem key={image.id} image={image} onRemove={onRemove} />
			))}
		</div>
	);
}

interface ImagePreviewItemProps {
	image: ImageValue;
	onRemove?: (id: string) => void;
}

function ImagePreviewItem({ image, onRemove }: ImagePreviewItemProps) {
	const [objectUrl, setObjectUrl] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (image.file) {
			const url = URL.createObjectURL(image.file);
			setObjectUrl(url);
			return () => {
				URL.revokeObjectURL(url);
			};
		} else if (image.url) {
			setObjectUrl(image.url);
		}
	}, [image.file, image.url]);

	if (!objectUrl) return null;

	return (
		<div className="group relative aspect-square overflow-hidden rounded-md border bg-muted">
			<img
				src={objectUrl}
				alt={image.name ?? "Preview da imagem"}
				className="h-full w-full object-cover"
			/>

			{onRemove && (
				<div className="absolute inset-x-0 top-0 flex justify-end p-1">
					<Button
						type="button"
						size="icon"
						variant="destructive"
						className="size-6 rounded-full opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
						onClick={() => onRemove(image.id)}
					>
						<X className="h-3 w-3" />
						<span className="sr-only">Remover imagem</span>
					</Button>
				</div>
			)}
		</div>
	);
}
