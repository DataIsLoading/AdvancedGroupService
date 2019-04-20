--[[
	// Name:   AdvancedGroupService
	// Author: Sebastian Erik Bauer (SimplyData)
	// Date:   20/02/2019
--]]
local GroupService = { }
local RbxGroupService = game:GetService("GroupService")

local function PagesToArray(Pages)
	local Array = { }
	while true do
		for _, Value in next, Pages:GetCurrentPage() do Array[#Array + 1] = Value end
		if Pages.IsFinished then break end
		pcall(Pages.AdvanceToNextPageAsync, Pages)
	end
end

function GroupService:GetRankInGroupAsync(UserId, GroupID)
	local Groups = GroupService:GetGroupsAsync(UserId)
	for Index = 1, #Groups do
		local Group = Groups[Index]
		if Group.Id == GroupID then
			return Group.Rank
		end
	end
	return 0
end

function GroupService:GetRoleInGroupAsync(UserId, GroupID)
	local Groups = GroupService:GetGroupsAsync(UserId)
	for Index = 1, #Groups do
		local Group = Groups[Index]
		if Group.Id == GroupID then
			return Group.Role
		end
	end
	return "Guest"
end

function GroupService:GetPrimaryGroupAsync(UserId)
	local Groups = GroupService:GetGroupsAsync(UserId)
	for Index = 1, #Groups do
		local Group = Groups[Index]
		if Group.IsPrimary then
			return Group
		end
	end
	return nil
end

function GroupService:IsInGroupAsync(UserId, GroupID)
	local Groups = GroupService:GetGroupsAsync(UserId)
	for Index = 1, #Groups do
		if Groups[Index].Id == GroupID then
			return true
		end
	end
	return false
end

function GroupService:IsPrimaryGroupAsync(UserId)
	local Groups = GroupService:GetGroupsAsync(UserId)
	for Index = 1, #Groups do
		if Groups[Index].IsPrimary then
			return true
		end
	end
	return false
end

function GroupService:IsGroupAlly(GroupID, TargetGroupID)
	local Groups = GroupService:GetGroupAlliesAsync(GroupID)
	for Index = 1, #Groups do
		if Groups[Index].Id == TargetGroupID then
			return true
		end
	end
	return false
end

function GroupService:IsGroupEnemy(GroupID, TargetGroupID)
	local Groups = GroupService:GetGroupEnemiesAsync(GroupID)
	for Index = 1, #Groups do
		if Groups[Index].Id == TargetGroupID then
			return true
		end
	end
	return false
end

function GroupService:GetGroupAlliesAsync(GroupID)
	local Success, GroupAlliesPages = pcall(RbxGroupService.GetAlliesAsync, RbxGroupService, GroupID)
	local GroupAllies = Success and GroupAlliesPages and PagesToArray(GroupAlliesPages)
	return GroupAllies
end

function GroupService:GetEnemiesAsync(GroupID)
	local Success, GroupEnemiesPages = pcall(RbxGroupService.GetEnemiesAsync, RbxGroupService, GroupID)
	local GroupEnemies = Success and GroupEnemiesPages and PagesToArray(GroupEnemiesPages)
	return GroupEnemies
end

function GroupService:GetGroupsAsync(UserId)
	local Success, Groups = pcall(RbxGroupService.GetGroupsAsync, RbxGroupService, UserId)
	return Success and Groups or { }
end

function GroupService:GetGroupInfoAsync(GroupID)
	local Success, GroupInfo = pcall(RbxGroupService.GetGroupInfoAsync, RbxGroupService, GroupID)
	return Success and GroupInfo or { }
end

return GroupService
