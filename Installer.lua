local HttpService = game:GetService("HttpService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerScriptService = game:GetService("ServerScriptService")

local _print = print
local NewModule = function(name, parent) local _inst = Instance.new("ModuleScript") _inst.Name = name or "Unnamed" _inst.Parent = parent or ReplicatedStorage return _inst end
local NewScript = function(name, parent) local _inst = Instance.new("Script") _inst.Name = name or "Unnamed" _inst.Parent = parent or ServerScriptService return _inst end
local function print(...)
  print("[GroupService Installer]", ...)
end
--------------------------------
print("Importing 'GroupService.lua'")
local Online = NewModule("GroupService")
Online.Source = GetAsync("GroupService.lua")

print("Importing 'GroupServiceOffline.lua'")
local Offline = NewModule("GroupServiceOffline")
Offline.Source = GetAsync("GroupServiceOffline.lua")

print("Importing 'Example.lua'")
local Example = NewScript("Example")
Example.Source = GetAsync("Example.lua")

print("Imported all Modules.")
