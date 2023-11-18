import React from "react";

interface PrimaryButtonProps {
    children: React.ReactNode;
    classes?: string;
    handler?: () => void;
    type: "button" | "submit" | "reset" | undefined;
}

const PrimaryButton = ({
    children,
    classes,
    handler,
    type = undefined,
}: PrimaryButtonProps) => {
    return (
        <button
            onClick={handler}
            type={type}
            className={`hover:text-gray-100 bg-gradient-to-r from-emerald-500 to-lime-500 text-white ${
                classes || ""
            }`}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
