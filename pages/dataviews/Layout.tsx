/**
 * Row
 * @param param0
 * @returns
 */
export function Row({
  children,
  className,
}: {
  children: React.ReactNode | Array<React.ReactNode>;
  className?: string;
}) {
  return <div className={`flex ${className}`}>{children}</div>;
}

/**
 * Container
 * @param param0
 * @returns
 */
export function Container({
  children,
}: {
  children: React.ReactNode | Array<React.ReactNode>;
}) {
  return <div className="width-full">{children}</div>;
}

export function ColumnNumbers({
  children,
  className,
}: {
  children: React.ReactNode | Array<React.ReactNode>;
  className?: string;
}) {
  return <div className={`text-end ${className}`}>{children}</div>;
}
