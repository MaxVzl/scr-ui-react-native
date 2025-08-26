import { View } from "react-native";
import { ScrUiProvider } from "@scr-ui/providers/ScrUiProvider";
import { ScrUiColors } from "@/constants/ScrUiColors";

/** @type{import("@storybook/react").Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    (Story, { parameters }) => (
      <ScrUiProvider value={{ colors: ScrUiColors }}>
        <View
          style={{
            flex: 1,
            // backgroundColor:
            //   parameters.noBackground === true ? undefined : "#26c6da",
            padding: 8,
          }}
        >
          <Story />
        </View>
      </ScrUiProvider>
    ),
  ],
};

export default preview;
