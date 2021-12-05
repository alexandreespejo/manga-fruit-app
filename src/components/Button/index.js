import { Text, TouchableOpacity } from "react-native";

export default function Button({ children, ...rest }) {
  return (
    <TouchableOpacity {...rest}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}

