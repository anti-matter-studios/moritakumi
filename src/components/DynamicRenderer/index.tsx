/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { type ComponentType, Fragment, type ReactNode } from "react";
import Slide, { SlideCard, SlideHeader, SlideCardList } from "@/components/Slide";
import BackgroundImage from "@/components/BackgroundImage";
import TransText from "@/components/TransText";

export interface DynamicBlock {
    type: keyof typeof COMPONENTS;
    content?: string;
    blocks?: DynamicBlock[];
    props?: Record<string, unknown>;
}

const COMPONENTS = {
    Slide,
    SlideHeader,
    SlideCard,
    SlideCardList,
    BackgroundImage,
    p: "p",
    hr: "hr",
    br: "br",
    span: "span",
    b: "b",
    i: "i",
    a: "a"
} as const;

interface DynamicRendererProps {
    blocks: DynamicBlock[];
    /** Base i18n key used to resolve translations if content is a key. */
    baseKey?: string;
}

export default function DynamicRenderer({ blocks, baseKey }: DynamicRendererProps) {
    return <Fragment>
        {blocks.map((block, index) => renderBlock(block, index, baseKey))}
    </Fragment>;
}

function renderBlock(block: DynamicBlock, index: number, baseKey?: string): ReactNode {
    const Component = COMPONENTS[block.type] as ComponentType<Record<string, unknown>>;
    
    let children: ReactNode = null;
    if (block.blocks) {
        children = <DynamicRenderer blocks={block.blocks} baseKey={baseKey} />;
    } else if (block.content) {
        children = <TransText>{block.content}</TransText>;
    }

    return <Component key={index} {...block.props}>
        {children}
    </Component>;
}
