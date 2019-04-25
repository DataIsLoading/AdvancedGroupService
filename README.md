# Extended GroupService
A module for Roblox that replaces the current GroupService with many more functions.

Extended GroupService replaces the current GroupService and adds many more functions like `:GetRankInGroupAsync` which gets the users group rank, and that without caching.

## How to use
You can either use the Installer (below), which you use over your command bar or insert it manually into your game.
```lua
loadstring(game:GetService("HttpService"):GetAsync("https://raw.githubusercontent.com/RealSimplyData/ExtendedGroupService/master/Installer.lua"))()
```

## Example
```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local GetModule = function(dir, name) return dir:FindFirstChild(name) and require(dir:FindFirstChild(name) or {} end
local GroupService, GroupServiceOffline = GetModule(ReplicatedStorage, "GroupService")

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
  local groupRank, isPrimary = GroupService:GetRankInGroupAsync(player.UserId, GROUP_ID), 
    GroupService:IsPrimaryGroupAsync(Player.UserId, GROUP_ID)
  print("Group Rank:", groupRank)
  print("Is Primary:", isPrimary
end

```

## API
The API can be found [here](https://realsimplydata.github.io/ExtendedGroupService/?v=1).
