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
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import javax.swing.tree.TreeSelectionModel


class CodexArcanaToolwindowFactory : ToolWindowFactory, DumbAware {

    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {
        val treeStructure = SpellcastingTreeStructure(project)
        val treeComponent = ScrollPaneFactory.createScrollPane(treeStructure.tree, 0)
        val content = ContentFactory.getInstance().createContent(treeComponent, null, false)
        toolWindow.contentManager.addContent(content)

        PluginCoroutine.getInstance(project).scope.launch {
          val httpClient = HttpClient(CIO)
          val json = Json {
            ignoreUnknownKeys = true
          }

          val ingredients = json.decodeFromString<Array<String>>(httpClient.get("https://the-coven.vercel.app/api/ingredients").bodyAsText())
          val incantations = json.decodeFromString<Array<String>>(httpClient.get("https://the-coven.vercel.app/api/incantations").bodyAsText())
          val recipes = json.decodeFromString<Array<Recipe>>(httpClient.get("https://the-coven.vercel.app/api/recipes").bodyAsText())

          val data = SpellcastingData(ingredients, incantations, recipes)
          withContext(Dispatchers.EDT) {
            treeStructure.loadData(data)
          }
        }
    }

    override fun shouldBeAvailable(project: Project) = true

}
