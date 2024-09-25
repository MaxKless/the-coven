package com.thecoven.codexarcana.util

import com.intellij.openapi.Disposable
import com.intellij.openapi.components.Service
import com.intellij.openapi.project.Project

@Service(Service.Level.PROJECT)
class PluginDisposable(private val project: Project) : Disposable {
    override fun dispose() {}

    companion object {
        fun getInstance(project: Project): PluginDisposable =
            project.getService(PluginDisposable::class.java)
    }
}