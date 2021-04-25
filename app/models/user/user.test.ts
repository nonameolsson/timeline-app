import { User, UserModel } from "./user";

test("can be created", () => {
  const instance: User = UserModel.create({});

  expect(instance).toBeTruthy();
});
