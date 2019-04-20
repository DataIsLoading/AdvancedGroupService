local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local GetModule = function(dir, name) return dir:FindFirstChild(name) and require(dir:FindFirstChild(name) or {} end
local GroupService, GroupServiceOffline = GetModule(ReplicatedStorage, "GroupService"), GetModule(ReplicatedStorage, "GroupServiceOffline")

local GROUP_ID = 0

--------------------------------------
-- Online Example
function playerAdded(player)
  local groupRank, isPrimary = GroupService:GetRankInGroupAsync(player.UserId, GROUP_ID), 
    GroupService:IsPrimaryGroupAsync(Player.UserId, GROUP_ID)
  print("Group Rank:", groupRank)
  print("Is Primary:", isPrimary)
end

--------------------------------------
-- Offline Example
function getUserInfo(userId)
  local groupRank, isPrimary = GroupServiceOffline:GetRankInGroupAsync(player.UserId, GROUP_ID), 
    GroupServiceOffline:IsPrimaryGroupAsync(Player.UserId, GROUP_ID)
  print("Group Rank:", groupRank)
  print("Is Primary:", isPrimary
end

-- The Offline Support will be moved into the main module soon, so don't rely on this too much.
