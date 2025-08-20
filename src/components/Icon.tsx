import { icons } from 'lucide-react-native';

const Icon = ({ name, color, size }: { name: keyof typeof icons, color: string, size: number }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default Icon;