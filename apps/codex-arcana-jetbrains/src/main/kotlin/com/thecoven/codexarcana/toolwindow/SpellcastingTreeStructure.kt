package com.thecoven.codexarcana.toolwindow

import com.intellij.openapi.application.EDT
import com.intellij.openapi.project.Project
import com.intellij.ui.tree.AsyncTreeModel
import com.intellij.ui.tree.StructureTreeModel
import com.intellij.ui.treeStructure.CachingSimpleNode
import com.intellij.ui.treeStructure.NullNode
import com.intellij.ui.treeStructure.SimpleNode
import com.intellij.ui.treeStructure.SimpleTree
import com.intellij.ui.treeStructure.SimpleTreeStructure
import com.thecoven.codexarcana.util.PluginCoroutine
import com.thecoven.codexarcana.util.PluginDisposable
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.swing.tree.TreeSelectionModel

class SpellcastingTreeStructure(private val project: Project) : SimpleTreeStructure() {
    private val treeModel = StructureTreeModel(this, PluginDisposable.getInstance(project))
    val tree: SimpleTree = SimpleTree().apply {
        isRootVisible = false
        emptyText.text = "Loading data..."
        selectionModel.selectionMode = TreeSelectionModel.SINGLE_TREE_SELECTION
        model = AsyncTreeModel(treeModel, PluginDisposable.getInstance(project))

    }
    private var root: SimpleNode = NullNode()


    fun loadData(data: SpellcastingData) {
        PluginCoroutine.getInstance(project).scope.launch {
            root = CodexArcanaNode.RootNode(data)
            withContext(Dispatchers.EDT) {
                treeModel.invalidateAsync()
            }
        }
    }

    override fun getRootElement(): Any {
        return root
    }
}

abstract class CodexArcanaNode(parent: CodexArcanaNode?) : CachingSimpleNode(parent) {

    class RootNode(val data: SpellcastingData) : CodexArcanaNode(null) {
        override fun buildChildren(): Array<SimpleNode> {
            return arrayOf(
              IngredientsSectionNode(data.ingredients, this),
              IncantationsSectionNode(data.incantations, this),
              RecipesSectionNode(data.recipes, this)
            )
        }
    }

    class IngredientsSectionNode(val data: Array<String>, parent: CodexArcanaNode) : CodexArcanaNode(parent) {
        override fun buildChildren(): Array<SimpleNode> {
            return data.map { IngredientNode(it, this) }.toTypedArray()
        }

      override fun getName() = "Ingredients"
    }

    class IncantationsSectionNode(val data: Array<String>, parent: CodexArcanaNode) : CodexArcanaNode(parent) {
        override fun buildChildren(): Array<SimpleNode> {
            return data.map { IncantationNode(it, this) }.toTypedArray()
        }

      override fun getName() = "Incantations"
    }

    class RecipesSectionNode(val data: Array<Recipe>, parent: CodexArcanaNode) : CodexArcanaNode(parent) {
        override fun buildChildren(): Array<SimpleNode> {
            return data.map { RecipeNode(it, this) }.toTypedArray()
        }

      override fun getName() = "Recipes"
    }

    class IngredientNode(val data: String, parent: CodexArcanaNode) : CodexArcanaNode(parent) {
        override fun buildChildren(): Array<SimpleNode> {
            return emptyArray()
        }

      override fun getName() = data
    }

    class IncantationNode(val data: String, parent: CodexArcanaNode) : CodexArcanaNode(parent) {
        override fun buildChildren(): Array<SimpleNode> {
            return emptyArray()
        }

      override fun getName() = data
    }

    class RecipeNode(val data: Recipe, parent: CodexArcanaNode) : CodexArcanaNode(parent) {
        override fun buildChildren(): Array<CodexArcanaNode> {
            return data.ingredients.map { IngredientNode(it, this) }.toTypedArray<CodexArcanaNode>() + data.incantations.map { IncantationNode(it, this) }.toTypedArray<CodexArcanaNode>()
        }

      override fun getName() = data.name
    }
}
