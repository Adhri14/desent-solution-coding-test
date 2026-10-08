import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";
import React, { ReactNode } from "react"

export type ProductCategory = 'chair' | 'desk' | 'acc'

export type ProductType = {
    id: string;
    name: string;
    price: number;
    type?: ProductCategory;
    icon: StaticImageData;
}

export type ProductResponseType = {
    chairs: ProductType[];
    desks: ProductType[];
    accessories: ProductType[];
    lifestyle: {
        coffee: Omit<ProductType, 'type'>[];
        relax: Omit<ProductType, 'type'>[];
    }
}