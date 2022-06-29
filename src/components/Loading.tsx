interface LoadingProps {
  isLoading?: boolean;
  children?: any;
}

export default function Loading(props: LoadingProps) {
  const { isLoading, children } = props;

  return (
    <div className="relative flex w-full justify-center">
      {isLoading && (
        <div className="w-[100%] h-[100%] flex absolute justify-center items-center top-0 left-0 bg-opacity-50 bg-black">
          <h1 className="text-white align-middle text-2xl">Carregando...</h1>
        </div>)}
      {children}
    </div>
  );
}