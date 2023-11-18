"use client";

import { Label, TextInput } from "flowbite-react";
// import { getErrorMessageByPropertyName } from "@/utils/schema-validator";

// import { spawn } from "child_process";
import { Controller, useFormContext } from "react-hook-form";
interface IInput {
    name: string;
    type?: string;
    value?: string | string[] | undefined;
    id?: string;
    placeholder?: string;
    validation?: object;
    label?: string;
    required?: boolean;
}

const FormInput = ({
    name,
    type = "text",
    value,
    id,
    placeholder,
    validation,
    label,
    required,
}: IInput) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    //   const errorMessage = getErrorMessageByPropertyName(errors, name);
    const errorMessage = "";

    return (
        <>
            <Controller
                control={control}
                name={name}
                defaultValue={value ? value : ""}
                render={({ field }) => (
                    <div className="mt-3">
                        <Label
                            htmlFor="name"
                            value={label}
                            className="text-base"
                        />
                        <TextInput
                            className="mt-1"
                            id={id}
                            type={type}
                            placeholder={placeholder}
                            required={required}
                            {...field}
                            value={value ? value : field.value}
                        />
                        {errorMessage && (
                            <Label
                                htmlFor={id}
                                className="text-red-500 text-sm"
                                value="Field is required"
                            />
                        )}
                    </div>
                )}
            />
        </>
    );
};

export default FormInput;
