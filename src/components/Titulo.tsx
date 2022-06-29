export default function Titulo(props: any) {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-2xl py-4 text-center">
        {props.children}
      </h1>
      <hr className="border-2 border-[#3C415C]" />
    </div>
  )
}