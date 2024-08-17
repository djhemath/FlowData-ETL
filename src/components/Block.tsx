import { Add } from "./icons";

export type BlockProps = {
    name: string;
}

export default function Block({
    name,
}: BlockProps) {
    return (
        <div className="block">
            <span>{name}</span>
            <Add />
        </div>
    );
}