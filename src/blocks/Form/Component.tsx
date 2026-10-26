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
import { cmsOrigin } from "@/utilities/cmsOrigin";
import { cn } from "@/utilities/ui";
import { brandSurface } from "@/utilities/brand";

export type FormBlockType = {
  blockName?: string;
  blockType?: "formBlock";
  enableIntro: boolean;
  showTitle?: boolean;
  /** The plugin's own type predates the slug we add in plugins/index. */
  form: FormType & { slug?: string };
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
      // The public endpoint addresses a form by name rather than by numeric
      // id, so the static build carries no CMS primary keys. The plugin's own
      // Form type predates the field, hence the cast — see plugins/index.
      slug: formSlug,
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
  // The honeypot's value. Held in state rather than read off the DOM so the
  // submit handler has it without reaching for a ref — people never type in
  // it, so a re-render per keystroke costs nothing.
  const [honeypot, setHoneypot] = useState("");
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

        // A submission's value column is a single required string, so two
        // shapes have to be flattened before they leave here.
        //
        // An array — a multiple-choice select — is joined with ", " so it
        // reads the same in the admin list, in the notification email and in
        // an export.
        //
        // Null is the one a visitor actually hits: an optional select that
        // nobody touched reports null, the collection rejects it, and the
        // whole submission comes back as an opaque 500 — every other answer
        // lost along with it. An empty string saves fine.
        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true);
        }, 1000);

        try {
          // The CMS, not this site. On ccbt.ro the page is static files on a
          // host with no API at all, so posting to its own origin is a 404 —
          // which is exactly how both reference projects' forms are broken.
          // On cms.ccbt.ro the two resolve to the same place.
          const req = await fetch(
            `${cmsOrigin()}/api/public/forms/${formSlug}`,
            {
              // The endpoint takes the answers as they were asked, and does
              // the rest itself: it joins multi-value answers, coerces an
              // untouched optional field to an empty string, and refuses
              // names the form does not declare. `hp` is the honeypot — a
              // field people never see and bots fill in.
              body: JSON.stringify({
                data,
                hp: honeypot,
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
              message:
                res.errors?.[0]?.message ||
                (res.error === "rate_limited"
                  ? "Prea multe încercări. Încearcă din nou peste câteva minute."
                  : "A apărut o eroare. Încearcă din nou."),
              status: String(req.status),
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
    [router, formSlug, redirect, confirmationType, honeypot],
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
      // The combobox is the single-choice select's trigger; the group is
      // the multiple-choice list. Both are white boxes that need no outline
      // against a saturated panel.
      "[&_[role=combobox]]:border-transparent [&_[role=group]]:border-transparent",
      "[&_.text-red-500]:text-white!",
      // Message fields are rich text, and rich text brings its own palette:
      // body copy in the ink base-content, headings in purple. All three are
      // near-invisible on these panels, so the whole subtree is pinned to the
      // panel's own colour. The `!` is needed because the prose modifiers that
      // set those colours are utilities too.
      "[&_.payload-richtext]:text-inherit!",
      "[&_.payload-richtext_*]:text-inherit!",
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
              {/* The honeypot. Hidden from people and from screen readers,
                  left in the markup for anything that fills a form by reading
                  it — the endpoint answers a filled one with a success and
                  saves nothing, because telling a bot it was caught only
                  teaches it to leave the field alone.

                  Not `display: none`: some bots skip what they cannot see.
                  `tabIndex={-1}` and `autoComplete="off"` keep it away from
                  keyboard users and from the browser's own autofill, which
                  would otherwise be the one thing that falsely trips it. */}
              <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor={`${formID}-hp`}>Lasă acest câmp gol</label>
                <input
                  autoComplete="off"
                  id={`${formID}-hp`}
                  name="hp"
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  type="text"
                  value={honeypot}
                />
              </div>
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
