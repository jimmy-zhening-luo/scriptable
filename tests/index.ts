import * as Mock from "./globals";

export function mochaGlobalSetup() {
  global.args = Mock.args;
  global.config = Mock.config;
  global.Data = Mock.Data;
  global.DateFormatter = Mock.DateFormatter;
  global.FileManager = Mock.FileManager;
  global.Image = Mock.Image;
  global.Location = Mock.Location;
  global.Notification = Mock.Notification;
  global.Size = Mock.Size;
}
