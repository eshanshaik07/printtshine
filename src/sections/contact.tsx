import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2, MessageCircle, Phone } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { AnimatedButton } from "@/components/animated-button";
import { StudioMap } from "@/components/studio-map";
import { submitContact } from "@/lib/contact.functions";

const PHONE_DISPLAY = "+91 92912 61143";
const PHONE_HREF = "tel:+919291261143";
const WHATSAPP_NUMBER = "919291261143";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi printShine, we are interested in making a project with you."
);
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const ADDRESS =
  "Cheeriyal Village, Rose Gardens, Keesara Mandal, Hyderabad, Telangana";


const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your name" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address" })
    .max(255, { message: "Email must be under 255 characters" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Tell us a little more (10+ characters)" })
    .max(2000, { message: "Message must be under 2000 characters" }),
});

type ContactValues = z.infer<typeof contactSchema>;

const contactCards = [
  {
    href: PHONE_HREF,
    icon: Phone,
    label: "Call us",
    value: PHONE_DISPLAY,
    hoverBg: "hover:bg-sky-500/10",
    hoverBorder: "hover:border-sky-400/40",
    iconColor: "group-hover:text-sky-400",
  },
  {
    href: WHATSAPP_HREF,
    icon: MessageCircle,
    label: "WhatsApp us",
    value: PHONE_DISPLAY,
    external: true,
    hoverBg: "hover:bg-emerald-500/10",
    hoverBorder: "hover:border-emerald-500/40",
    iconColor: "group-hover:text-emerald-400",
  },
];


export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: ContactValues) => {
    setSubmitting(true);
    try {
      await submitContact({ data: values });
      toast.success("Message sent — we'll be in touch within two business days.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none transition-all duration-300 focus:border-primary-foreground/60 focus:bg-primary-foreground/10";

  return (
    <section
      id="contact"
      className="bg-primary px-6 py-32 text-primary-foreground transition-colors duration-500 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

        <div>
          <FadeIn>
            <span className="text-xs font-medium uppercase tracking-widest text-primary-foreground/60">
              Start a project
            </span>
            <h2 className="mt-6 font-display text-4xl font-medium tracking-tight sm:text-5xl lg:text-5xl">
              Let's make something
              <br />
              worth remembering.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-primary-foreground/70">
              Tell us what you're building. We'll respond within two business days
              with next steps and a clear path forward.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {contactCards.map((card, i) => (
                <motion.a
                  key={card.label}
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className={`group flex items-center gap-4 rounded-2xl border border-primary-foreground/15 p-6 transition-colors duration-300 ${card.hoverBg} ${card.hoverBorder}`}
                >
                  <motion.div
                    className="shrink-0"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <card.icon className={`h-6 w-6 text-primary-foreground/60 transition-colors duration-300 ${card.iconColor}`} />
                  </motion.div>
                  <span className="flex-1">
                    <span className="block text-[0.65rem] uppercase tracking-widest text-primary-foreground/50">
                      {card.label}
                    </span>
                    <span className="mt-1 block text-lg font-medium leading-snug">
                      {card.value}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-primary-foreground/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.a>
              ))}
            </div>
          </FadeIn>

        </div>

        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {[
              { id: "name", label: "Name", type: "text", placeholder: "Your name" },
              { id: "email", label: "Email", type: "email", placeholder: "you@company.com" },
            ].map((field) => (
              <motion.div
                key={field.id}
                animate={{
                  scale: focusedField === field.id ? 1.01 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <label
                  htmlFor={field.id}
                  className="mb-2 block text-xs uppercase tracking-widest text-primary-foreground/50"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className={fieldClass}
                  {...register(field.id as keyof ContactValues)}
                  onFocus={() => setFocusedField(field.id)}
                  onBlur={() => setFocusedField(null)}
                />
                {errors[field.id as keyof ContactValues] && (
                  <p className="mt-2 text-xs text-primary-foreground/70">
                    {errors[field.id as keyof ContactValues]?.message}
                  </p>
                )}
              </motion.div>
            ))}

            <motion.div
              animate={{
                scale: focusedField === "message" ? 1.01 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <label
                htmlFor="message"
                className="mb-2 block text-xs uppercase tracking-widest text-primary-foreground/50"
              >
                Project details
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="What are you building?"
                className={`${fieldClass} resize-none`}
                {...register("message")}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
              />
              {errors.message && (
                <p className="mt-2 text-xs text-primary-foreground/70">
                  {errors.message.message}
                </p>
              )}
            </motion.div>

            <AnimatedButton
              type="submit"
              variant="inverse"
              size="lg"
              disabled={submitting}
              className="group w-full"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  Send message
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </>
              )}
            </AnimatedButton>
          </form>
        </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-12 lg:mt-16">
            <StudioMap address={ADDRESS} label="Secunderabad, Telangana, India" />
          </div>
        </FadeIn>
      </div>
    </section>

  );
}
