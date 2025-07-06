#!/usr/bin/env python3
"""
Test script for the AI Chatbot
"""
import requests
import json
import uuid

BASE_URL = "http://localhost:8000"

def test_chatbot():
    """Test the chatbot functionality"""
    print("🤖 Testing AI Chatbot...")
    print("=" * 50)
    
    # Test 1: Get initial suggestions
    try:
        response = requests.get(f"{BASE_URL}/api/chatbot/suggestions")
        if response.status_code == 200:
            suggestions = response.json()["suggestions"]
            print("✅ Initial suggestions loaded:")
            for i, suggestion in enumerate(suggestions, 1):
                print(f"   {i}. {suggestion}")
        else:
            print("❌ Failed to get suggestions")
    except Exception as e:
        print(f"❌ Error getting suggestions: {e}")
    
    print("\n" + "=" * 50)
    
    # Test 2: Test chat functionality
    test_messages = [
        "Hello!",
        "Tell me about your projects",
        "What skills do you have?",
        "Show me the demos",
        "How can I contact you?"
    ]
    
    session_id = str(uuid.uuid4())
    
    for i, message in enumerate(test_messages, 1):
        try:
            print(f"\n🧪 Test {i}: '{message}'")
            
            chat_data = {
                "message": message,
                "session_id": session_id
            }
            
            response = requests.post(
                f"{BASE_URL}/api/chatbot/chat",
                json=chat_data
            )
            
            if response.status_code == 200:
                result = response.json()
                print(f"✅ Response: {result['response'][:100]}...")
                print(f"   Confidence: {result['confidence']:.2f}")
                if result['suggestions']:
                    print(f"   Suggestions: {result['suggestions'][:2]}")
            else:
                print(f"❌ Failed: {response.status_code}")
                
        except Exception as e:
            print(f"❌ Error: {e}")
    
    print("\n" + "=" * 50)
    
    # Test 3: Get capabilities
    try:
        response = requests.get(f"{BASE_URL}/api/chatbot/capabilities")
        if response.status_code == 200:
            capabilities = response.json()
            print("✅ Chatbot capabilities:")
            for capability in capabilities["capabilities"][:3]:
                print(f"   • {capability}")
        else:
            print("❌ Failed to get capabilities")
    except Exception as e:
        print(f"❌ Error getting capabilities: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 Chatbot testing complete!")

if __name__ == "__main__":
    test_chatbot() 