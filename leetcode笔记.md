### 1. Two Sum

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].

思路：设置一个对象res，key存储当前数组元素对应加到target对应的另一半，value存储当前的下标，例如res = {7:1}。



```
var twoSum = function(nums, target) {
    let i = 1;
    let len = nums.length;
    let res = {};
    res[target - nums[0]] = 0 ;
    let indexs = [0];
    while(i<len){
        if(res[nums[i]] || res[nums[i]]===0){
            return [res[nums[i]],i];
        }else{
            res[target - nums[i]] = i;
        }
        i++;
    }
};
```

### 2. Add Two Numbers

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)

Output: 7 -> 0 -> 8

Explanation: 342 + 465 = 807.

```
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    var keep = 0;
    var head = new ListNode(0);
    var current = head;
    while(l1 || l2 || keep){
        var sum = (l1 ? l1.val : 0)+ (l2 ? l2.val : 0)+ keep;
        keep = ~~(sum/10);
        current.next = new ListNode(sum % 10);
        current = current.next;
        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;
    }
    
    keep && (current.next=new ListNode(keep));
    
    return head.next;
};
```

### 3. Longest Substring Without Repeating Characters

Given a string, find the length of the longest substring without repeating characters.

Example 1:

Input: "abcabcbb" <br/>
Output: 3 <br/>
Explanation: The answer is "abc", with the length of 3. 


Example 2:

Input: "bbbbb" <br/>
Output: 1 <br/>
Explanation: The answer is "b", with the length of 1. <br/>


Example 3:

Input: "pwwkew" <br/>
Output: 3 <br/>
Explanation: The answer is "wke", with the length of 3.  <br/>
             Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
             
```
var lengthOfLongestSubstring = function(s) {
    let temp = '';
    const len = s.length;
    let i=0;
    let resLen = 0;
    while(i<len){
        let cur = s[i];
        let index = temp.indexOf(cur);
        if(~index){
            temp = temp.slice(index+1)
        }
        temp +=cur;
        resLen = Math.max(resLen,temp.length);
        i++;
    }
    return  Math.max(resLen,temp.length);
};
```
### 4. Median of Two Sorted Arrays

There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

You may assume nums1 and nums2 cannot be both empty.

Example 1:

nums1 = [1, 3]
nums2 = [2]

The median is 2.0
Example 2:

nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5

思路：首先合并为一个有序的数组，再取这个数组最中间的数字，如果是合并后数组长度Len是奇数，则最中间的下标是Len/2向下取整，Len是偶数，则是最中间的是两个下标对应元素取平均，最中间的两个下标分别是Len/2和Len/2-1

```
var findMedianSortedArrays = function(nums1, nums2) {
    let len1 = nums1.length;
    let len2 = nums2.length;
    let i = 0;
    let j = 0;
    let mergeArr = [];
    let other = [];
    let len = len1 + len2;
    
    while(i<len1 && j<len2){
        if(nums1[i]<nums2[j]){
            mergeArr.push(nums1[i]);
            i++;
        }else{
            mergeArr.push(nums2[j]);
            j++;
        }
    }
    
    
    if(i<len1){
        other = nums1.slice(i);
    }
    if(j<len2){
       other = nums2.slice(j);
    }
    mergeArr = [...mergeArr,...other];
    
    
    if(len%2 == 0){
        let index1 = ~~(len/2);
        let index2 = ~~(len/2) - 1;
        return (mergeArr[index1]+mergeArr[index2])/2;
    }else{
        let index = ~~(len/2);
        return mergeArr[index];
    }
    
};
```