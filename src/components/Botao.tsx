interface BotaoProps {
  children?: any;
  className?: string;
  cor?: 'green' | 'blue' | 'gray';
  onClick?: () => void;
}

export default function Botao(props: BotaoProps) {
  const gradCor = props.cor ?? 'gray';


  return (
    <button onClick={props.onClick} className={`
      ${gradCor === 'blue' ? 'from-blue-400 to-blue-700' : ''}
      ${gradCor === 'green' ? 'from-green-400 to-green-700' : ''}
      ${gradCor === 'gray' ? 'from-gray-400 to-gray-700' : ''}
      bg-gradient-to-r
      text-white px-4 py-2 rounded-md
      ${props.className ?? ''}
    `}>
      {props.children}
    </button>
  )
}