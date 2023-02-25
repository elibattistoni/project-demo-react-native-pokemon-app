import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import RootComponent from "./components/RootComponent";

//! Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <RootComponent />
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("MyApplication", () => App);
