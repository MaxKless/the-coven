package com.thecoven.codexarcana.toolwindow

import com.intellij.openapi.application.EDT
import com.intellij.openapi.components.service
import com.intellij.openapi.diagnostic.thisLogger
import com.intellij.openapi.project.DumbAware
import com.intellij.openapi.project.Project
import com.intellij.openapi.wm.ToolWindow
import com.intellij.openapi.wm.ToolWindowFactory
import com.intellij.ui.ScrollPaneFactory
import com.intellij.ui.components.JBPanel
import com.intellij.ui.content.ContentFactory
import com.intellij.ui.treeStructure.SimpleTree
import com.intellij.ui.treeStructure.SimpleTreeStructure
import com.thecoven.codexarcana.util.PluginCoroutine
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.swing.tree.TreeSelectionModel


class CodexArcanaToolwindowFactory : ToolWindowFactory, DumbAware {

    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {
        val treeStructure = SpellcastingTreeStructure(project)
        val treeComponent = ScrollPaneFactory.createScrollPane(treeStructure.tree, 0)
        val content = ContentFactory.getInstance().createContent(treeComponent, null, false)
        toolWindow.contentManager.addContent(content)

        // TODO: Load data from API
    }

    override fun shouldBeAvailable(project: Project) = true

}
