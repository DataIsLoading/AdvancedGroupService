print("Installing..")
local HttpService = game:GetService("HttpService")
local Module = Instance.new("ModuleScript")
Module.Name = "AdvancedGroupService"
Module.Source = HttpService:GetAsync("https://raw.githubusercontent.com/DataIsLoading/AdvancedGroupService/master/AdvancedGroupService.lua")
Module.Parent = game:GetService("ReplicatedStorage")

local Example = Instance.new("Script")
Example.Name ="AdvancedGroupService Example"
Example.Source = [[local GroupService = require(game:GetService("ReplicatedStorage"):WaitForChild("AdvancedGroupService"))
local Players = game:GetService("Players")
local GroupId = 2651565

Players.PlayerAdded:Connect(function(Player) --> DataIsLoading
  local GroupRank = GroupService:GetRankInGroupAsync(Player.UserId, GroupId)
  local IsPrimary = GroupService:IsPrimaryGroupAsync(Player.UserId, GroupId)
  local IsInClan  = GroupService:IsInClanAsync(Player.UserId, GroupId)
  print("Group Rank:", GroupRank) --> Group Rank: Lead Developer
  print("Is Primary:", IsPrimary) --> Is Primary: true
  print("Is In Clan:", IsInClan)  --> Is In Clan: false
end)]]
Example.Parent = game:GetService("ServerScriptService")
print("Installed.")
