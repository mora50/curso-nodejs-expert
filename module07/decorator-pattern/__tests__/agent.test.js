import { test, beforeEach, describe, expect, jest } from '@jest/globals'
import { Server } from 'http'
import { InjectHttpInterceptor } from '../src/agent'

const originalHttp = jest.createMockFromModule('http')

describe('HTTP Interceptor Agent', () => {
  const eventName = 'request'
  const request = null
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should not change header', () => {
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    }

    const serverInstance = new originalHttp.Server()

    serverInstance.emit(eventName, request, response)
    expect(response.setHeader).not.toHaveBeenCalled()
  })
  test('should active header interceptor', async () => {
    await InjectHttpInterceptor()

    const response = {
      setHeader: jest.fn().mockReturnThis(),
    }

    const serverInstance = new Server()
    serverInstance.emit(eventName, request, response)
    expect(response.setHeader).toHaveBeenCalledWith(
      'X-Instrumented-By',
      'CesarAugusto'
    )
  })
})
