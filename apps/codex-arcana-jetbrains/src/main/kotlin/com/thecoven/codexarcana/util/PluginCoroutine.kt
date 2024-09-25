package com.thecoven.codexarcana.util

import com.intellij.openapi.Disposable
import com.intellij.openapi.components.Service
import com.intellij.openapi.project.Project
import kotlinx.coroutines.CoroutineScope

@Service(Service.Level.PROJECT)
class PluginCoroutine(private val project: Project, val scope: CoroutineScope) {

    companion object {
        fun getInstance(project: Project): PluginCoroutine =
            project.getService(PluginCoroutine::class.java)
    }
}