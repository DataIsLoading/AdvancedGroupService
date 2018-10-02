# AdvancedGroupService
A module for Roblox that replaces the current GroupService with many more functions.

AdvancedGroupService replaces the current GroupService and adds many more functions like `:GetRankInGroupAsync` which gets the users group rank, and that without caching.

## How to use
You can either use the Installer (below), which you use over your command bar or insert it manually into your game.
```lua
loadstring(game:GetService("HttpService"):GetAsync("https://raw.githubusercontent.com/DataIsLoading/AdvancedGroupService/master/Installer.lua"))()
```

## Example
```lua
local GroupService = require(path.to.module)
local Players = game:GetService("Players")
local GroupId = 2651565

Players.PlayerAdded:Connect(function(Player) --> DataIsLoading
  local GroupRank = GroupService:GetRankInGroupAsync(Player.UserId, GroupId)
  local IsPrimary = GroupService:IsPrimaryGroupAsync(Player.UserId, GroupId)
  local IsInClan  = GroupService:IsInClanAsync(Player.UserId, GroupId)
  print("Group Rank:", GroupRank) --> Group Rank: Lead Developer
  print("Is Primary:", IsPrimary) --> Is Primary: true
  print("Is In Clan:", IsInClan)  --> Is In Clan: false
end)
```

## API
The API can be found [here](http://www.dataisloading.xyz/AdvancedGroupService/api-reference/class/AdvancedGroupService).
