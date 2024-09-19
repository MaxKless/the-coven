package com.thecoven.codexarcana

import com.intellij.notification.NotificationGroupManager
import com.intellij.notification.NotificationType
import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent

class HelloAction: AnAction() {
    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
        val group = NotificationGroupManager.getInstance().getNotificationGroup("Codex Arcana")
        group.createNotification("Sup, witches", NotificationType.INFORMATION).notify(project)
    }
}