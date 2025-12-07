interface EmptyPageProps {
  title: string;
}

export function EmptyPage({ title }: EmptyPageProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 lg:px-6">
      <div className="text-center">
        <div className="text-2xl font-semibold mb-2">{title}</div>
        <div className="text-muted-foreground">Эта страница пока в разработке</div>
      </div>
    </div>
  );
}