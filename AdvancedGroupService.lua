--[[
	// Name:   AdvancedGroupService
	// Author: Sebastian Erik Bauer (DataIsLoading)
	// Date:   06/01/2019
--]]

local GroupService = game:GetService("GroupService")

local AdvancedGroupService = {}
local __INTERNAL__ = {}
	function __INTERNAL__:PagesToArray(pages)
		local array = {}
		while true do
			for key, value in pairs(pages:GetCurrentPage()) do
				table.insert(array, value)
			end
			if (pages.isFinished) then
				break
			end
			pages:AdvanceToNextPageAsync()
		end
	end

function AdvancedGroupService:__INTERNALS__() 
	return __INTERNAL__
end

--[[ AdvancedGroupService Functions ]]--
function AdvancedGroupService:GetRankInGroupAsync(userId, groupId)
	local Groups = AdvancedGroupService:GetGroupsAsync(userId)
	for _,group in pairs(Groups) do
		if (group.Id == groupId) then
			return group.Rank
		end
	end
	return 0
end

function AdvancedGroupService:GetRoleInGroupAsync(userId, groupId)
	local Groups = AdvancedGroupService:GetGroupsAsync(userId)
	for _,group in pairs(Groups) do
		if (group.Id == groupId) then
			return group.Role
		end
	end
	return "Guest"
end

function AdvancedGroupService:GetPrimaryGroupAsync(userId)
	local Groups = AdvancedGroupService:GetGroupsAsync(userId)
	for _,group in pairs(Groups) do
		if (group.IsPrimary == true) then
			return group
		end
	end
	return nil
end

function AdvancedGroupService:GetClanAsync(userId)
	local Groups = AdvancedGroupService:GetGroupsAsync(userId)
	for _,group in pairs(Groups) do
		if (group.IsInClan == true) then
			return group
		end
	end
	return nil
end

function AdvancedGroupService:IsInGroupAsync(userId, groupId)
	local Groups = AdvancedGroupService:GetGroupsAsync(userId)
	for _,group in pairs(Groups) do
		if (group.Id == groupId) then
			return true
		end
	end
	return false
end

function AdvancedGroupService:IsPrimaryGroupAsync(userId, groupId)
	local Groups = AdvancedGroupService:GetGroupsAsync(userId)
	for _,group in pairs(Groups) do
		if (group.IsPrimary == true) then
			return true
		end
	end
	return false
end

function AdvancedGroupService:IsInClanAsync(userId, groupId)
	local Groups = AdvancedGroupService:GetGroupsAsync(userId)
	for _,group in pairs(Groups) do
		if (group.IsInClan == true) then
			return true
		end
	end
	return false
end

function AdvancedGroupService:IsGroupEnemy(groupId, targetGroupId)
	local GroupEnemies = AdvancedGroupService:GetGroupEnemiesAsync(groupId)
	for _, group in pairs(GroupEnemies) do
		if (group.Id == targetGroupId) then
			return true
		end
	end
	return false
end

function AdvancedGroupService:IsGroupAlly(groupId, targetGroupId)
	local GroupEnemies = AdvancedGroupService:GetGroupAlliesAsync(groupId)
	for _, group in pairs(GroupEnemies) do
		if (group.Id == targetGroupId) then
			return true
		end
	end
	return false
end

function AdvancedGroupService:GetGroupAlliesAsync(groupId)
	local GroupAlliesPages = AdvancedGroupService:GetAlliesAsync(groupId)
	local GroupAllies = AdvancedGroupService:__INTERNALS__():PagesToArray(GroupAlliesPages)
	return GroupAllies
end

function AdvancedGroupService:GetGroupEnemiesAsync(groupId)
	local GroupEnemiesPages = AdvancedGroupService:GetEnemiesAsync(groupId)
	local GroupEnemies = AdvancedGroupService:__INTERNALS__():PagesToArray(GroupEnemiesPages)
	return GroupEnemies
end

--[[ GroupService Functions ]]--
function AdvancedGroupService:GetAlliesAsync(groupId)
	return GroupService:GetAlliesAsync(groupId)
end

function AdvancedGroupService:GetEnemiesAsync(groupId)
	return GroupService:GetEnemiesAsync(groupId)
end

function AdvancedGroupService:GetGroupInfoAsync(groupId)
	return GroupService:GetGroupInfoAsync(groupId)
end

function AdvancedGroupService:GetGroupsAsync(userId)
	return GroupService:GetGroupsAsync(userId)
end

return AdvancedGroupService
