interface LoaderProps {
  fullScreen?: boolean;
}

const Loader = ({ fullScreen = false }: LoaderProps) => {
  const spinner = (
    <div className="flex items-center justify-center gap-2 text-brand-600 dark:text-brand-100">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        {spinner}
      </div>
    );
  }

  return <div className="flex justify-center py-10">{spinner}</div>;
};

export default Loader;
