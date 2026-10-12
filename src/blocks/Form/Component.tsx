"use client";
import type {
  FormFieldBlock,
  Form as FormType,
} from "@payloadcms/plugin-form-builder/types";

import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import RichText from "@/components/RichText";
import { Button } from "@/components/ui/button";
import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

import { fields } from "./fields";
import { getClientSideURL } from "@/utilities/getURL";
import { cn } from "@/utilities/ui";
import { brandSurface } from "@/utilities/brand";

export type FormBlockType = {
  blockName?: string;
  blockType?: "formBlock";
  enableIntro: boolean;
  showTitle?: boolean;
  form: FormType;
  introContent?: DefaultTypedEditorState;
};

export const FormBlock: React.FC<
  {
    id?: string;
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    showTitle,
    form: formFromProps,
    form: {
      id: formID,
      title: formTitle,
      confirmationMessage,
      confirmationType,
      redirect,
      submitButtonLabel,
    } = {},
    introContent,
  } = props;

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<
    { message: string; status?: string } | undefined
  >();
  const router = useRouter();

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>;
      const submitForm = async () => {
        setError(undefined);

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }));

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true);
        }, 1000);

        try {
          const req = await fetch(
            `${getClientSideURL()}/api/form-submissions`,
            {
              body: JSON.stringify({
                form: formID,
                submissionData: dataToSend,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            },
          );

          const res = await req.json();

          clearTimeout(loadingTimerID);

          if (req.status >= 400) {
            setIsLoading(false);

            setError({
              message: res.errors?.[0]?.message || "Internal Server Error",
              status: res.status,
            });

            return;
          }

          setIsLoading(false);
          setHasSubmitted(true);

          if (confirmationType === "redirect" && redirect) {
            const { url } = redirect;

            const redirectUrl = url;

            if (redirectUrl) router.push(redirectUrl);
          }
        } catch (err) {
          console.warn(err);
          setIsLoading(false);
          setError({
            message: "Something went wrong.",
          });
        }
      };

      void submitForm();
    },
    [router, formID, redirect, confirmationType],
  );

  const { variant } = props as { variant?: string | null };
  const onBrand = variant === "purple" || variant === "coral";

  /**
   * The panel.
   *
   * The two brand variants are solid, saturated surfaces, so every control on
   * them has to be re-stated: a label in the body colour, a field with the
   * page's own border, and a coral button on a coral panel all disappear. The
   * fields become white boxes — the most legible thing on either colour, and
   * the one treatment that reads the same on both — and the error text goes
   * white, since red on coral is barely a colour change.
   *
   * Written as descendant selectors rather than threading a variant through
   * every field component: the fields are shared with the rest of the site and
   * have no reason to know what they are sitting on.
   */
  const panelClass = cn(
    "rounded-box p-4 lg:p-6",
    !onBrand && "border-primary/30 border",
    onBrand && brandSurface(variant, "purple"),
    onBrand && [
      "[&_label]:text-inherit",
      // Not the checkbox: daisyUI draws that one itself.
      "[&_input:not([type=checkbox])]:bg-base-100 [&_input:not([type=checkbox])]:text-base-content [&_input:not([type=checkbox])]:border-transparent",
      "[&_textarea]:bg-base-100 [&_textarea]:text-base-content [&_textarea]:border-transparent",
      "[&_[role=combobox]]:border-transparent",
      "[&_.text-red-500]:text-white!",
    ],
  );

  return (
    <div className="container mx-auto border-0 lg:max-w-3xl">
      {showTitle && formTitle && !hasSubmitted && (
        // Deliberately smaller than a section heading: this sits inside the form
        // card, not above a page section. It also comes from the related form
        // document rather than the block, which is why it survived the removal
        // of the blocks' own title fields.
        <h2
          className={cn(
            "mb-4 text-center text-lg font-semibold md:text-xl",
            onBrand ? "text-inherit" : "text-primary",
          )}
        >
          {formTitle}
        </h2>
      )}
      {enableIntro && introContent && !hasSubmitted && (
        <RichText
          className="mb-8 lg:mb-12"
          data={introContent}
          enableGutter={false}
        />
      )}
      <div className={panelClass}>
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === "message" && (
            <RichText
              className={onBrand ? "**:text-inherit!" : "text-base-content"}
              data={confirmationMessage}
            />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && (
            <div>{`${error.status || "500"}: ${error.message || ""}`}</div>
          )}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              {/* The fields carry the page's dark body colour by default. On a
                  brand panel that is the one thing they must not do, so the
                  colour comes from the panel instead and the labels inherit
                  white. */}
              <div
                className={cn(
                  "mb-4 last:mb-0",
                  !onBrand && "text-neutral",
                )}
              >
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> =
                      fields?.[field.blockType as keyof typeof fields];
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>

              {/* A coral button on a coral panel is invisible, and the purple
                  one is nearly so on purple — the inverted button is white on
                  both. */}
              <Button
                form={formID}
                type="submit"
                variant={onBrand ? "brandInvert" : "brand"}
                size="clear"
              >
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  );
};
