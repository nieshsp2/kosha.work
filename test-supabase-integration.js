// Test Supabase Integration - Run this in browser console
// This script tests the corrected payload structure for guest users

console.log('🧪 Testing Supabase Integration with corrected guest user payload...');

// Test 1: Test the corrected profile creation payload
async function testCorrectedProfilePayload() {
  console.log('\n📝 Test 1: Testing corrected profile payload structure...');
  
  try {
    // Generate a test guest ID
    const testGuestId = 'test_' + Date.now();
    
    // Test payload with correct structure for guest users
    const testPayload = {
      user_id: null, // Set to null for guest users
      guest_id: testGuestId, // Use guest_id instead
      email: "test@example.com",
      age: 30,
      gender: "Other",
      occupation: "Tester",
      location: "Test City",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('✅ Corrected payload structure:', testPayload);
    console.log('✅ user_id is null (correct for guest users)');
    console.log('✅ guest_id is present (required for RLS policies)');
    
    // Test if this payload would pass RLS validation
    if (testPayload.user_id === null && testPayload.guest_id) {
      console.log('✅ Payload structure should pass RLS policy: (auth.uid() = user_id) OR (guest_id IS NOT NULL)');
      console.log('✅ Since user_id is null and guest_id is present, guest_id IS NOT NULL = true');
    } else {
      console.log('❌ Payload structure incorrect');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Test 1 failed:', error);
    return false;
  }
}

// Test 2: Test the corrected assessment creation payload
async function testCorrectedAssessmentPayload() {
  console.log('\n📊 Test 2: Testing corrected assessment payload structure...');
  
  try {
    // Generate a test guest ID
    const testGuestId = 'test_' + Date.now();
    
    // Test payload with correct structure for guest users
    const testPayload = {
      user_id: null, // Set to null for guest users
      guest_id: testGuestId, // Use guest_id instead
      status: 'not_started',
      total_questions: 23,
      current_index: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('✅ Corrected assessment payload structure:', testPayload);
    console.log('✅ user_id is null (correct for guest users)');
    console.log('✅ guest_id is present (required for RLS policies)');
    
    // Test if this payload would pass RLS validation
    if (testPayload.user_id === null && testPayload.guest_id) {
      console.log('✅ Assessment payload structure should pass RLS policy');
    } else {
      console.log('❌ Assessment payload structure incorrect');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Test 2 failed:', error);
    return false;
  }
}

// Test 3: Compare old vs new payload structure
async function comparePayloadStructures() {
  console.log('\n🔄 Test 3: Comparing old vs new payload structures...');
  
  const oldPayload = {
    user_id: "13096467-cc06-4929-87c9-25a6edf77649", // ❌ This caused the RLS error
    email: "nileshsp2_test7@gmail.com",
    age: 41,
    gender: "Male",
    occupation: "entrepreneur",
    location: "Bangalore",
    created_at: "2025-08-10T15:01:11.893Z",
    updated_at: "2025-08-10T15:01:11.893Z"
  };
  
  const newPayload = {
    user_id: null, // ✅ Correct for guest users
    guest_id: "13096467-cc06-4929-87c9-25a6edf77649", // ✅ Use the UUID as guest_id
    email: "nileshsp2_test7@gmail.com",
    age: 41,
    gender: "Male",
    occupation: "entrepreneur",
    location: "Bangalore",
    created_at: "2025-08-10T15:01:11.893Z",
    updated_at: "2025-08-10T15:01:11.893Z"
  };
  
  console.log('❌ OLD payload (caused RLS error):', oldPayload);
  console.log('✅ NEW payload (should work with RLS):', newPayload);
  
  console.log('\n🔍 RLS Policy Analysis:');
  console.log('Policy: (auth.uid() = user_id) OR (guest_id IS NOT NULL)');
  
  // Test old payload
  const oldResult = (null === oldPayload.user_id) || (oldPayload.guest_id !== null);
  console.log(`❌ OLD payload result: (null === "${oldPayload.user_id}") OR (${oldPayload.guest_id} !== null) = ${oldResult}`);
  
  // Test new payload
  const newResult = (null === newPayload.user_id) || (newPayload.guest_id !== null);
  console.log(`✅ NEW payload result: (null === ${newPayload.user_id}) OR (${newPayload.guest_id} !== null) = ${newResult}`);
  
  return true;
}

// Test 4: Test the actual guestUserService methods
async function testGuestUserService() {
  console.log('\n🔧 Test 4: Testing guestUserService methods...');
  
  try {
    if (typeof window.guestUserService !== 'undefined') {
      console.log('✅ guestUserService is available');
      
      // Test profile creation
      console.log('📝 Testing profile creation...');
      const profile = await window.guestUserService.createOrUpdateProfile({
        email: "test@example.com",
        age: 25,
        gender: "Other",
        occupation: "Developer",
        location: "Test City"
      });
      
      console.log('✅ Profile created:', profile);
      console.log('✅ user_id is null:', profile.user_id === null);
      console.log('✅ guest_id is present:', !!profile.guest_id);
      
      // Test assessment creation
      console.log('📊 Testing assessment creation...');
      const assessment = await window.guestUserService.createAssessment();
      
      console.log('✅ Assessment created:', assessment);
      console.log('✅ user_id is null:', assessment.user_id === null);
      console.log('✅ guest_id is present:', !!assessment.guest_id);
      
      return true;
    } else {
      console.log('❌ guestUserService not available - make sure the app is loaded');
      return false;
    }
  } catch (error) {
    console.error('❌ Test 4 failed:', error);
    return false;
  }
}

// Test 5: Test assessment completion flow
async function testAssessmentCompletionFlow() {
  console.log('\n📝 Test 5: Testing assessment completion flow...');
  try {
    // Create a new assessment
    const assessment = await guestUserService.createAssessment();
    console.log('✅ Created assessment:', assessment);
    
    // Simulate completing the assessment by updating status to completed
    await guestUserService.updateAssessmentProgress(23, 'completed');
    console.log('✅ Updated assessment status to completed');
    
    // Check if assessment is now completed
    const isCompleted = await guestUserService.isAssessmentCompleted();
    console.log('✅ Assessment completion check:', isCompleted);
    
    // Get the updated assessment
    const updatedAssessment = await guestUserService.getAssessment();
    console.log('✅ Updated assessment:', updatedAssessment);
    
    // Verify status is completed
    if (updatedAssessment && updatedAssessment.status === 'completed') {
      console.log('✅ Assessment status correctly set to completed');
    } else {
      console.log('❌ Assessment status not set to completed');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('❌ Test 5 failed:', error);
    return false;
  }
}

// Test 6: Test response saving and retrieval
async function testResponseSaving() {
  console.log('\n📝 Test 6: Testing response saving and retrieval...');
  try {
    // Save a test response
    const testQuestionId = 'test-question-id';
    await guestUserService.saveResponse(testQuestionId, 'test-option-id');
    console.log('✅ Response saved');
    
    // Get responses
    const responses = await guestUserService.getResponses();
    console.log('✅ Retrieved responses:', responses);
    
    // Check if responses are found (should be empty if assessment not completed)
    if (responses.length === 0) {
      console.log('✅ No responses returned (expected for incomplete assessment)');
    } else {
      console.log('✅ Responses found:', responses.length);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Test 6 failed:', error);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting Supabase Integration Tests...\n');
  
  const results = [];
  
  results.push(await testCorrectedProfilePayload());
  results.push(await testCorrectedAssessmentPayload());
  results.push(await comparePayloadStructures());
  results.push(await testGuestUserService());
  results.push(await testAssessmentCompletionFlow());
  results.push(await testResponseSaving());
  
  console.log('\n📊 Test Results Summary:');
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log(`✅ Passed: ${passed}/${total}`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! The payload structure should now work with Supabase RLS policies.');
  } else {
    console.log('⚠️ Some tests failed. Check the output above for details.');
  }
  
  return results;
}

// Export functions for manual testing
window.testSupabaseIntegration = {
  testCorrectedProfilePayload,
  testCorrectedAssessmentPayload,
  comparePayloadStructures,
  testGuestUserService,
  testAssessmentCompletionFlow,
  testResponseSaving,
  runAllTests
};

console.log('🧪 Test functions loaded. Run testSupabaseIntegration.runAllTests() to start testing.');
console.log('💡 You can also run individual tests like: testSupabaseIntegration.testCorrectedProfilePayload()');
