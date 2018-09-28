# AdvancedGroupService
A module for Roblox that replaces the current GroupService with many more functions.

AdvancedGroupService replaces the current GroupService and adds many more functions like `:GetRankInGroupAsync` which gets the users group rank, and that without caching.

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
The API can be found [here](https://www.example.com).
