import type { MDXComponents } from "mdx/types";

/** Journal typography: the reference's 25px body copy in a ~864px column. */
const components: MDXComponents = {
  h2: (props) => <h2 className="text-h2 mb-6 mt-16 text-balance first:mt-0 md:mt-20" {...props} />,
  h3: (props) => <h3 className="mb-4 mt-10 text-[22px] font-medium tracking-[-0.03em] md:text-[28px]" {...props} />,
  p: (props) => <p className="text-body-lg mb-6 text-pretty" {...props} />,
  ul: (props) => <ul className="text-body-lg mb-8 flex list-none flex-col gap-3 pl-0" {...props} />,
  ol: (props) => <ol className="text-body-lg mb-8 flex list-decimal flex-col gap-3 pl-6 marker:text-felt" {...props} />,
  li: (props) => <li className="relative pl-7 before:absolute before:left-0 before:text-felt before:content-['→'] [ol>&]:pl-1 [ol>&]:before:content-none" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-12 border-l-4 border-gobi pl-6 text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em] md:my-16 md:pl-10 [&_p]:text-[length:inherit] [&_p]:leading-[inherit]" {...props} />
  ),
  a: (props) => <a className="underline decoration-felt underline-offset-4 hover:text-felt" {...props} />,
  strong: (props) => <strong className="font-medium" {...props} />,
  hr: () => <div aria-hidden className="ornament-line my-14" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
