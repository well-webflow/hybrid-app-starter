declare module "subresource-integrity" {
  const sri: {
    generate: (data: string) => Promise<string>;
  };
  export default sri;
}
