import { Static, Type } from "@sinclair/typebox";

export const GetSignedUrlParams = Type.Object({
  fileName: Type.String(),
  contentType: Type.String(),
});

export type TGetSignedUrlParams = Static<typeof GetSignedUrlParams>;
